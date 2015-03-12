#!/usr/bin/python

import sys # for reading argument and exit call
import json

# with open('MultipleChoice.json') as json_data:
f = open('MultipleChoice.json')
mc = json.load(f)
f.close()
    # json_data.close()
# print mc
for k in mc['comment']:
	print '#'+k
for section in mc['sections']:
	print
	print '@'+section['description']
	for c in section['comment']:
		print '#'+c
	for question in section['questions']:
		print 
		print '?'+question['stem']
		print '!'+question['key']
		for distractor in question['distractors']:
			print '*'+str(distractor)
