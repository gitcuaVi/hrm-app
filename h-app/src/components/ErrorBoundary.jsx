import React from "react";
import sendErrorToTelegram from "../utils/sendErrorToTelegram"; // Import đúng

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Lỗi ứng dụng:", error, errorInfo);
    sendErrorToTelegram(`🔥 Lỗi ứng dụng: ${error.toString()}\n📌 Chi tiết: ${errorInfo.componentStack}`);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.hasError && !this.state.hasError) {
      this.setState({ hasError: false });
    }
  }
  

  render() {
    if (this.state.hasError) {
      return <h1>⚠️ Có lỗi xảy ra! Vui lòng thử lại sau.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
