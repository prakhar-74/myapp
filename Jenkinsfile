pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "prakhar8070/myapp:dev"
    }

    stages {
        // Jenkins already checks out the repo by default

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
                bat "docker build -t %DOCKER_IMAGE% ."
            }
        }

        stage('Push image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    // Windows-safe login
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                    bat "docker push %DOCKER_IMAGE%"
                    bat 'docker logout'
                }
            }
        }
    }
}
