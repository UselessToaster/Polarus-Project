# Polarus Texas Legislature Bill Scraper

This script scrapes the Texas Legislature website to extract bill information, including bill numbers, links, and other relevant data, and outputs the results to the console.

## Overview

- **Purpose**: The script pulls data from the Texas Legislature's passed bills page, extracts information about bills, and processes it into a dictionary.
- **Main Output**: Bill data is printed to the console and can be further processed for database insertion.

## Requirements

The script requires the following Python packages:

- `requests`: To make HTTP requests to retrieve web content.
- `beautifulsoup4`: To parse and navigate the HTML structure.
- `collections` (part of Python standard library): For using `defaultdict` to handle dictionary data.
- `re` (part of Python standard library): For regular expressions, used to split certain text fields.

### Install the required packages:
To install the dependencies, you can use the following command:
```bash
pip install -r requirements.txt
```