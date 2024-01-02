class SuccessResponse {
  constructor({ message, status = 200, data }) {
    this.message = message;
    this.status = status;
    this.data = data;
  }

  send(res) {
    res.status(this.status).json({
      message: this.message,
      data: this.data,
    });
  }
}

export default SuccessResponse;
