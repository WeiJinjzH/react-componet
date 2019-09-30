#coding=utf-8
import os
import re
import json


with open('README.md') as fr, open('README_temp', 'w') as fw, open('package-lock.json') as packageJSON:

  packageInfo = json.load(packageJSON)
  dependencies = packageInfo['dependencies']

  def updateVersion(matched):
    label = str(matched.group('label'))
    dependencyName = str(matched.group('dependencyName')).lower()
    version = 'unknow'
    if dependencyName in dependencies:
      version = str(dependencies[dependencyName]['version'])
    return str('- '+label+': ['+dependencyName+' '+version+']')

  
  data = fr.read()
  data = re.sub(re.compile(r'- (?P<label>.*): \[(?P<dependencyName>.*) (?P<version>.*)\]'), updateVersion, data)

  fw.write(data)

os.remove('README.md')
os.rename('README_temp', 'README.md')
print('\033[1;32mREADME.md updated successfully!\033[0m')