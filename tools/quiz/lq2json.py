#!/usr/bin/python

import sys # for reading argument and exit call
import json

class Quiz():
	def __init__(self,description):
		self.description = description
		self.sections = []
		self.comment = []
	def add_section(self,section):
		self.sections.append(section.__dict__)
	def add_comment(self,comment):
		self.comment.append(comment)

class Section():
	def __init__(self,description):
		self.description = description
		self.questions = []
		self.comment = []
	def add_question(self,question):
		self.questions.append(question.__dict__)
	def add_comment(self,comment):
		self.comment.append(comment)

class Question():
	def __init__(self,name):
		self.name = name
		self.comment = []
		self.languages = []
	def add_description(self, description):
		self.description = description
	def add_input(self,input):
		self.input = input
	def add_output(self,output):
		self.output = output
	def add_comment(self,comment):
		self.comment.append(comment)
	def add_languages(self,languages):
		self.languages.append(languages.strip())

def syntax_error(cnt,str):
	print "unexcepted charactor on line ",cnt
	print "\t",str
	sys.exit(-1);

if(len(sys.argv)<2):

	print "Convert long question text file to json file"
	print "Usage: "
	print sys.argv[0] + " lq_file_name "
	# we may remove the file created
	sys.exit(-1);

mcq_file_name = sys.argv[1];

try:
	mcq_file = open(mcq_file_name,"r")
except IOError:
	print "file not found"
	sys.exit(-1)
except :
	print "Unknow Error"
	sys.exit(-1)
else:
	state = 0

	quiz = Quiz('question bank');
	section = None
	question = None
	line_cnt = 0;
	pre_char = "-";
	for line in mcq_file:
		line_cnt += 1

		# skip empty lines
		if len(line) < 2:
			continue

		first_char = line[0]
		string = line[1:].strip("\n")

		# skip comment
		if(first_char == "#"):
			if( not question is None):
				question.add_comment(string)
			elif( not section is None):
				section.add_comment(string)
			elif( not quiz is None):
				quiz.add_comment(string)
			else:
				syntax_error(line_cnt,line)
			continue
		elif(first_char == "-"):
			if(pre_char == "-"):
				syntax_error(line_cnt, line)
			elif(pre_char == "@"):
				section.description += '<br/>'+string
			elif(pre_char == "?"):
				question.description += '<br/>'+string
			elif(pre_char == ">"):
				question.input += '<br/>'+string
			elif(pre_char == "<"):
				question.output += '<br/>'+string
			elif(pre_char == "$"):
				question.add_languages(string)
			continue
		# Finite State Machine
		#          ------------------------------------------------------
		#          |                              	 	   	  			|
		# 		   v                      			 	      			|
		# 0 -'@'-> 1 -'*'-> 2 -'?'-> 3 -'>'-> 4 -'<'-> 5 -'$'-> 6 -'@'---
		#							 ^			       |
		#							 | 				  '?'
		#							 -------------------
		if(state == 0):
			if(first_char == "@"):
				state = 1;
				section = Section(string)
			else:
				syntax_error(line_cnt,line)
		elif(state == 1):
			if(first_char == "*"):
				state = 2
				question = Question(string)
			else:
				syntax_error(line_cnt,line)
		elif(state == 2):
			if(first_char == "?"):
				state = 3
				question.add_description(string)
			else:
				syntax_error(line_cnt,line)
		elif(state == 3):
			if(first_char == ">"):
				state = 4
				question.add_input(string)
			else:
				syntax_error(line_cnt,line)
		elif(state == 4):
			if(first_char == "<"):
				state = 5
				question.add_output(string)
			else:
				syntax_error(line_cnt,line)
		elif(state == 5):
			if(first_char == "$"):
				state = 6
				question.add_languages(string)
			else:
				syntax_error(line_cnt,line)
		elif(state == 6):
			if(first_char == "@"):
				state = 1
				section.add_question(question)
				quiz.add_section(section)
				section = Section(string)
			elif(first_char == "*"):
				state = 2
				section.add_question(question)
				question = Question(string)
			else:
				syntax_error(line_cnt,line)	
		else:
			print "State error "+ str(state)
			sys.exit(-1)
		if(first_char != "-"):
			pre_char = first_char
	if (question):
		section.add_question(question)
	if (section):
		quiz.add_section(section)
	print json.dumps(quiz.__dict__, indent=1)
