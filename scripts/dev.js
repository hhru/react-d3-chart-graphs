const { spawn } = require('child_process');
const process = require('process');

process.env.NODE_ENV = 'development';

const webpackWatch = spawn('webpack', ['--watch'], {
    cwd: './',
    env: process.env,
});
const example = spawn('yarn', ['start', ], {
    cwd: './examples'
});


webpackWatch.stdout.on('data', (data) => {
    console.log(`WebpackWatch stdout: ${data}`);
});

webpackWatch.stderr.on('data', (data) => {
    console.log(`WebpackWatch stderr: ${data}`);
});

webpackWatch.on('close', (code) => {
    console.log(`WebpackWatch child process exited with code ${code}`);
});

example.stdout.on('data', (data) => {
    console.log(`Example stdout: ${data}`);
});

example.stderr.on('data', (data) => {
    console.log(`Example stderr: ${data}`);
});

example.on('close', (code) => {
    console.log(`Example child process exited with code ${code}`);
});
