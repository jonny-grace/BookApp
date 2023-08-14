import React from 'react';
import BookList from '../components/organism/BookList';

const Home: React.FC = () => {
  return (
    <div className=" text-2xl">
      <p className="text-4xl py-6 font-bold text-center">Books</p>

      <BookList />
    </div>
  );
};

export default Home;
