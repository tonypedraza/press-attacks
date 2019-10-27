# import libraries
import pandas
import re
import time
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Class to help with selenium clicks
# found at: http://www.obeythetestinggoat.com/how-to-get-selenium-to-wait-for-page-load-after-a-click.html

def wait_for(condition_function):
    start_time = time.time()
    while time.time() < start_time + 10:
    	if condition_function():
    		return True
    	else:
    		time.sleep(0.1)
    raise Exception(
        'Timeout waiting for {}'.format(condition_function.__name__)
    )

class wait_for_page_load(object):
    def __init__(self, browser):
    	self.browser = browser

    def __enter__(self):
        self.old_page = self.browser.find_element_by_xpath("//table[@class='table js-report-builder-table']/tbody/tr/td[1]")

    def page_has_loaded(self):
        new_page = self.browser.find_element_by_xpath("//table[@class='table js-report-builder-table']/tbody/tr/td[1]")
        return new_page != self.old_page

    def __exit__(self, *_):
    	wait_for(self.page_has_loaded)

# Global variable to keep track of 
# journalist pages that returned 404 errors
no_page_journalists = []

'''
Function to parse through pagination with Selenium
'''
def parse_pages():
	# start a web driver and navigate to list page
	browser = webdriver.Chrome()
	browser.get("https://cpj.org/data/?status=Killed&start_year=1992&end_year=2018&group_by=year&motiveConfirmed%5B%5D=Confirmed&motiveUnconfirmed%5B%5D=Unconfirmed&type%5B%5D=Journalist&type%5B%5D=Media%20Worker")

	# column names for csv
	columns = ['Name', 'Organization', 'Date', 'Location', 'Killed', 'Type Of Death', "Specific Location", 
			   'Job', 'Medium', 'Coverage', 'Gender', 'Local/Foreign', 'Freelance', 
			   'Charge', 'Sentence Length', 'Health Problems', 'Source of Fire',
			   'Impunity', 'Captive', 'Tortured', 'Threatened', 'Description']

	final_data = iterate_pages(columns, browser)

	# one last csv write:
	df = pandas.DataFrame(data=final_data, columns=columns)
	df.to_csv('cpj_scraped_data_final.csv', sep=',', index=False)

'''
Function to iterate through pages on CPJ site
'''
def iterate_pages(columns, browser):
	final_data = []
	# hardcode 95, the number of pagination pages
	for page in range(96):
		print("Retrieving data from page " + str(page + 1))
		final_data = final_data + extract_data(browser.page_source)

		# writing to csv each iteration in case something breaks:
		df = pandas.DataFrame(data=final_data, columns=columns)
		df.to_csv('cpj_scraped_data.csv', sep=',', index=False)

		next_page(browser)

	return final_data

'''
Function to navigate to next page and wait for it to load
'''
def next_page(browser):
	WebDriverWait(browser, 20, poll_frequency=1).until(EC.visibility_of_element_located(((By.XPATH, "//ul/li[@class='page-item next']"))))
	
	with wait_for_page_load(browser):
		browser.find_element_by_link_text('Next').click()

'''
Function to extract data from the table of journalists
'''
def extract_data(page):
	# Get table of journalists
	soup = BeautifulSoup(page, 'html.parser')
	table = soup.find('table', attrs={'class': 'js-report-builder-table'})
	table_body = table.find('tbody')
	table_elements = table_body.find_all('tr')

	data = []
	for element in table_elements:
		cols = element.find_all('td')

		# get link from first col using re, sleep for a second to not trouble server
		time.sleep(1)
		link = re.findall('"([^"]*)"', str(cols[0]))[0]
		profile_page = webdriver.Chrome()
		profile_page.get(link)

		# only process data if link doesn't return 404
		if not profile_page.find_elements_by_xpath("//*[contains(text(), 'File Not Found')]"):
			data = data + process_information(cols, profile_page)
		else:
			# keep track of links that didn't work
			no_page_journalists.append([cols[0].text.strip(), link])

	return data

'''
Function to process all information and add to new row
'''
def process_information(cols, profile_page):
	# Get city or specific location
	location_title = re.findall('"([^"]*)"', str(cols[3]))[0]
	specific_location = location_title.split(", ")[0]

	data = []
	cols = [ele.text.strip() for ele in cols]
	entry = [ele for ele in cols if ele]
	entry.append(specific_location)

	# get journalist information and append to entry
	journalist_info = get_journalist_info(profile_page)
	for info in journalist_info:
		entry.append(info)

	data.append(entry)

	# For keeping track of status
	print(cols[0])

	return data

''' 
Function to get description of a journalist from separate web page 
'''
def get_journalist_info(profile_page):
	# Retrieve data from page
	profile_soup = BeautifulSoup(profile_page.page_source, 'html.parser')
	profile_data = []
	id_array = ["jobs", "mediums", "coverages", "gender", "localOrForeign",
			 "freelance", "charges", "lengthOfSentence", "healthProblems",
			 "sourcesOfFire", "impunity", "captive", "tortured", "threatened"]
	for id_string in id_array:
		entry = profile_soup.find('dd', attrs={'id': id_string})
		profile_data.append(entry.text.strip())

	description = profile_soup.find('article', attrs={'class': 'entry-content'})
	profile_data.append(description.text.strip())

	profile_page.quit()
	return profile_data

'''
Main function
'''
def main():
	parse_pages()
	print("Journalists with no profile pages or links that didn't work:")
	print(no_page_journalists)

main()
