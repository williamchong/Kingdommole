#!/usr/bin/python
import sys
import mc2json
import json

if __name__ == "__main__":
	if(len(sys.argv)<2):
		print "Read Section List File"
		print "Usage: "
		print sys.argv[0] + " section_list_file"
		# we may remove the file created
		sys.exit(-1);

	section_list_file = sys.argv[1];

	try:
		section_list = open(section_list_file,"r")
	except IOError:
		print "file not found"
		sys.exit(-1)
	except :
		print "Unknow Error"
		sys.exit(-1)
	else:
		quiz = mc2json.Quiz('Question Bank')
		for file_name in section_list:
			file_name = file_name.strip()
			f = open(file_name,"r")
			print "processing %s" % file_name
			quiz = mc2json.appendSectionFromFile(f,quiz)

		print "export?(Y/n): "
		res = sys.stdin.readline().lower()
		if res[0] == 'y':
			print json.dumps(quiz.__dict__, indent=1)
			print "is It OK?(Y/n): "
			res = sys.stdin.readline().lower()
			if res[0] == 'y':
				export_file = open('MultipleChoice.json','w');
				export_file.write(json.dumps(quiz.__dict__, indent=1))
				export_file.close()
