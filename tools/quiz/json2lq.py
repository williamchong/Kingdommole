#!/usr/bin/python

import sys # for reading argument and exit call
import json

f = open('LongQuestion.json')
lq = json.load(f)
f.close()
    # json_data.close()
# print mc
for c in lq['comment']:
	print '#'+c
for s in lq['sections']:
	print
	print '@'+s['description']
	for c in s['comment']:
		print '#'+c
	for q in s['questions']:
		print '*'+q['name']
		print '?'+q['description']
		print '>'+q['input']
		print '<'+q['output']