pipeline {
  agent any

  options {
    timestamps()
    ansiColor('xterm')
    // Jenkins will do the default SCM checkout for this Jenkinsfile
  }

  environment {
    DOCKER_IMAGE = 'prakhar8070/myapp:dev'
  }

  stages {

    stage('Diagnostics') {
      steps {
        bat 'ver'
        bat 'node -v'
        bat 'npm -v'
        bat 'docker version'
      }
    }

    stage('Install dependencies') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Run tests') {
      steps {
        bat 'npm test'
      }
    }

    stage('Build image') {
      steps {
        bat 'docker build -t %DOCKER_IMAGE% .'
      }
    }

    stage('Push image') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'docker-hub-creds',   // Jenkins credential you created
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          bat """
            echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
            docker push %DOCKER_IMAGE%
            docker logout
          """
        }
      }
    }
  }

  post {
    always {
      // Best-effort logout in case a previous step failed
      bat 'docker logout || ver >NUL'
    }
  }
}
