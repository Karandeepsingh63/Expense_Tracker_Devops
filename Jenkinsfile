pipeline {
    agent any

    environment {
        DOCKERHUB_CRED = credentials('dockerhub-creds')
        FRONTEND_IMAGE = "karandeep6300/expense-frontend:v1"
        BACKEND_IMAGE  = "karandeep6300/expense-backend:v1"
    }

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/KarandeepSingh63/Expense_Tracker_Devops.git', branch: 'main'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $FRONTEND_IMAGE ./frontend'
                sh 'docker build -t $BACKEND_IMAGE ./backend'
            }
        }

        stage('Trivy Scan') {
            steps {
                sh 'trivy image $FRONTEND_IMAGE'
                sh 'trivy image $BACKEND_IMAGE'
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh 'echo $DOCKERHUB_CRED_PSW | docker login -u $DOCKERHUB_CRED_USR --password-stdin'
                sh 'docker push $FRONTEND_IMAGE'
                sh 'docker push $BACKEND_IMAGE'
            }
        }
    }
}