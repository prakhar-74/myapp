pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "prakhar8070/myapp:dev"
  }

  stages {
    // (No Checkout stage — Jenkins will do the default checkout from the job config)

    stage('Diagnostics') {
      steps {
        bat 'ver'
        bat 'node -v'
        bat 'npm -v'
        bat 'docker version'
      }
    }

    stage('Install dependencies') { steps { bat 'npm ci' } }

    stage('Run tests') { steps { bat 'npm test' } }

    stage('Build image') { steps { bat "docker build -t %DOCKER_IMAGE% ." } }

    stage('Push image') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'docker-hub-creds',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-^pQpJSa4;3fy3yv'
          bat "docker push %DOCKER_IMAGE%"
        }
      }
    }
  }
}
