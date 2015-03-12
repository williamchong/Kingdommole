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
		self.languages = []
	def add_language(self,language):
		self.languages.append(language.strip())
	def add_question(self,question):
		self.questions.append(question.__dict__)
	def add_comment(self,comment):
		self.comment.append(comment)

class Question():
	def __init__(self,stem):
		self.languages = []
		self.distractors = []
		self.keys = []
		self.comment = []
		self.stem = stem
	def add_language(self,language):
		self.languages.append(language.strip())
	def add_distractor(self,distractor):
		self.distractors.append(distractor)
	def add_key(self,key):
		self.keys.append(key)
	def add_comment(self,comment):
		self.comment.append(comment)

def syntax_error(cnt,str):
	print "unexcepted charactor on line ",cnt
	print "\t",str
	sys.exit(-1);

def appendSectionFromFile(mcq_file, quiz):
	state = 0
	section = None
	question = None
	line_cnt = 0;
	key_cnt = 0;
	distractor_cnt = 0;
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
				question.stem += '<br/>'+string
			elif(pre_char == "*"):
				question.distractors[len(question.distractors)-1] += '<br/>'+string
			elif(pre_char == "!"):
				question.key += '<br/>'+string
			elif(pre_char == "$"):
				section.add_language(string)
			else:
				syntax_error(line_cnt,line)
			continue
		# Finite State Machine
		#
		#		   --------------'@'-----------
		#          |		                  |
		#		   | 		|-----------'?'----
		#          v        v                 |
		# 0 -'@'-> 1 -'?'-> 2 -'*'-> 3 -'!'-> 4 -'*'
		#                            ^   |    ^   |
		#                   		 -'*'-    |----
		#
		if(state == 0):
			# A new section
			if  (first_char == "@"):
				state = 1;
				section = Section(string)
			else:
				syntax_error(line_cnt,line)
		elif(state == 1):
			# get language of section or create new question
			if  (first_char == "$"):
				section.add_language(string)
			elif(first_char == "?"):
				state = 2
				question = Question(string)
			else:
				syntax_error(line_cnt,line)
		elif(state == 2):
			# get language of question or get stems or distractors
			key_cnt = distractor_cnt = 0
			if  (first_char == '$'):
				question.add_language(string)
			else:
				if  (first_char == '*'):
					state = 3
					question.add_distractor(string)
					distractor_cnt = 1
				elif(first_char == '!'):
					state = 3
					question.add_key(string)
					key_cnt = 1
				else:
					syntax_error(line_cnt,line)
				for language in section.languages:
					question.add_language(language)
		elif(state == 3):
			if  (first_char == "!"):
				question.add_key(string)
				key_cnt += 1
			elif(first_char == "*"):
				question.add_distractor(string)
				distractor_cnt += 1
			elif(key_cnt >= 1 and distractor_cnt >= 3):
				if  (first_char=="?"):
					state = 2
					section.add_question(question)
					question = Question(string)
				elif(first_char=="@"):
					state = 1
					section.add_question(question)
					question = Question(string)
					quiz.add_section(section)
					section = Section(string)
				else:
					syntax_error(line_cnt,line)
			else:
				syntax_error(line_cnt,line)
		else:
			print "State error"
			sys.exit(-1)
		if(first_char != "-"):
			pre_char = first_char
	if (question):
		section.add_question(question)
	if (section):
		quiz.add_section(section)
	return quiz

if __name__ == "__main__":
	if(len(sys.argv)<2):

		print "Convert mcq file to json file"
		print "Usage: "
		print sys.argv[0] + " mcq_file_name "
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
		quiz = Quiz('Question Bank')
		quiz = appendSectionFromFile(mcq_file,quiz)
		print json.dumps(quiz.__dict__, indent=1)

