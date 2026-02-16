pipeline {
    agent any
    
    triggers {
        // Trigger automatically on push via webhook
        githubPush()
        // Backup: Poll every minute if webhook fails
        pollSCM('* * * * *')
    }
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building Docker images...'
                script {
                    sh 'docker-compose build'
                }
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                script {
                    // Add your test commands here
                    sh 'docker-compose run --rm client npm test || true'
                    sh 'docker-compose run --rm server npm test || true'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                script {
                    sh 'docker-compose down || true'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            echo 'Cleaning up...'
            sh 'docker system prune -f || true'
        }
    }
}