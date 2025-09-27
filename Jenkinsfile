pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "prakhar8070/myapp:dev"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/prakhar-74/myapp.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $DOCKER_IMAGE ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    sh "docker push $DOCKER_IMAGE"
                }
            }
        }
    }
}
