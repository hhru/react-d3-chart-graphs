const { spawn } = require('child_process');
const process = require('process');

process.env.NODE_ENV = 'development';
process.env.NODE_OPTIONS = '--openssl-legacy-provider';

const rollupWatch = spawn('rollup', ['-c', '--bundleConfigAsCjs', '--watch'], {
    cwd: './',
    env: process.env,
});

const example = spawn('yarn', ['start', ], {
    cwd: './examples',
});

rollupWatch.stdout.on('data', (data) => {
    console.log(`Rollup stdout: ${data}`);
});

rollupWatch.stderr.on('data', (data) => {
    console.log(`Rollup stderr: ${data}`);
});

rollupWatch.on('close', (code) => {
    console.log(`Rollup child process exited with code ${code}`);
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
