interface ErrorPageProps {
  error?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  return <div>{error}</div>;
};

export default ErrorPage;
