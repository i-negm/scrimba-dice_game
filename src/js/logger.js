const Logger_loggerVerbosity = {
  NONE: 0,
  DEBUG: 1,
  WARN: 2,
  ERROR: 4,
  ALL: 7
};

function Logger_debug(msg) {
  if (this.level & this.enum.verbosity.DEBUG) {
    console.log("[DEBUG]: " + msg);
  } else {
    // Do nothing
  }
}

function Logger_error(msg) {
  if (this.level & this.enum.verbosity.ERROR) {
    console.error("[ERROR]: " + msg);
  } else {
    // Do nothing
  }
}

function Logger_warn(msg) {
  if (this.level & this.enum.verbosity.WARN) {
    console.warn("[WARN]: " + msg);
  } else {
    // Do nothing
  }
}

function Logger_setVerbosityLevel(level) {
  this.level = level;
  this.debug("Logger verbosity = " + this.level);
}

const Logger = {
  level: this.enum.verbosity.NONE,
  debug: Logger_debug,
  error: Logger_error,
  warn: Logger_warn,
  enum: {
    verbosity: Logger_loggerVerbosity
  },
  setVerbosityLevel: Logger_setVerbosityLevel
};
