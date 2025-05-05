const maxTimeLimit = 60000;
const maxRequests = 5;

const ipRequestLogs = {};
const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const currentTime = Date.now();

    if (!ipRequestLogs[ip]) {
        ipRequestLogs[ip] = []
    }

    ipRequestLogs[ip] = ipRequestLogs[ip].filter(
        timestamp => currentTime - timestamp < maxTimeLimit
    )

    if(ipRequestLogs[ip].length >= maxRequests) {
        return res.status(429).json({message: "too many requests. Please try again after some time"})
    }

    ipRequestLogs[ip].push(currentTime)
    next();
}

export default rateLimiter;