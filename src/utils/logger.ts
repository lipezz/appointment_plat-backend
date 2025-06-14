import pino from 'pino'

export const logger = pino({
  level: 'info',
  transport: {
    targets: [
      {
        target: 'pino-pretty', //pino-file : JSON
        options: {
          colorize: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
        },
        level: 'info',
      },
      {
        target: 'pino-pretty',
        options: {
          destination: './logs/app.log',
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          colorize: false,
          ignore: 'pid,hostname',
        },
        level: 'info',
      },
    ],
  },
})
