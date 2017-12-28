pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''git pull
'''
        sh 'npm install'
      }
    }
    stage('Deploy') {
      steps {
        sh '''npm start
'''
      }
    }
  }
}