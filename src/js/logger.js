const loggerVerbosity = {
  NONE: 0,
  DEBUG: 1,
  WARN: 2,
  ERROR: 4,
  ALL: 7
};

function debug(msg) {
  if (this.level & this.enum.verbosity.DEBUG) {
    console.log("[DEBUG]: " + msg);
  } else {
    // Do nothing
  }
}

function error(msg) {
  if (this.level & this.enum.verbosity.ERROR) {
    console.error("[ERROR]: " + msg);
  } else {
    // Do nothing
  }
}

function warn(msg) {
  if (this.level & this.enum.verbosity.WARN) {
    console.warn("[WARN]: " + msg);
  } else {
    // Do nothing
  }
}

function setVerbosityLevel(level) {
  this.level = level;
}

const Logger = {
  level: loggerVerbosity.NONE,
  debug: debug,
  error: error,
  warn: warn,
  enum: {
    verbosity: loggerVerbosity
  },
  setVerbosityLevel: setVerbosityLevel
};
