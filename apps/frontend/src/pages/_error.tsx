import React from 'react';
import { NextPageContext } from 'next';

interface ErrorProps {
  statusCode?: number;
  hasGetInitialProps?: boolean;
  err?: Error;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          {statusCode === 404
            ? 'This page could not be found.'
            : 'Sorry, there was a problem with this page.'}
        </p>
        <a
          href="/"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
