# GuessWho
 A kahoot like game focused on student interaction created to help give name to faces for students learning remotely.

## Introduction
This project is designed to enhance interaction and collaboration within online classroom settings. By leveraging WebSockets for real-time communication, it enables students to learn the names of their peers through a game-like experience, facilitated by a teacher or administrator.

## Features
- Real-time communication between students and teachers
- Support for multiple classrooms through unique access codes
- Interactive game to match names to faces, improving peer recognition

## Prerequisites
Before you begin, ensure you have installed:
- Node.js (Version x.x.x or later)
- A modern web browser that supports JavaScript and WebSockets

## Installation
Clone the repository to your local machine:
```bash
git clone <repository-url>
cd classroom-name-learning-game
```

Install the necessary Node.js dependencies:

```bash
npm install
```

## Usage

To start the game server, run:

```bash
node index.js
```

## For Teachers/Administrators

- Open teacher.html in your web browser.
- Enter your admin code and create a game session by specifying an access code.
- Upload student images and names to generate game content.

## For Students
- Open student.html in your web browser.
- Enter your first and last name, along with the access code provided by your teacher.
- Participate in the game by matching names to faces.

## First time creating my own client server interaction using JavaScript.

- Hosted on an AWS EC2 Instance.
