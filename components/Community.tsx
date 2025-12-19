
import React from 'react';
import { Screen } from '../types';

interface CommunityProps {
  navigate: (screen: Screen) => void;
}

const Community: React.FC<CommunityProps> = ({ navigate }) => {
  const posts = [
    { id: 1, user: 'Sarah M.', pet: 'Buster', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400', likes: 124, text: 'First time at the park today! 🌲' },
    { id: 2, user: 'Tom R.', pet: 'Misty', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400', likes: 89, text: 'Monday mood... 💤' },
    { id: 3, user: 'Emma W.', pet: 'Cooper', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400', likes: 210, text: 'New toy day is the best day!' },
    { id: 4, user: 'John D.', pet: 'Rocky', img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400', likes: 345, text: 'Running is my cardio! 🏃‍♂️' },
  ];

  return (
    <div className="flex flex-col h-full pb-32">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <h1 className="text-2xl font-black tracking-tight dark:text-white">Comunidade</h1>
        <button className="size-11 flex items-center justify-center rounded-full bg-primary/10 text-primary active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
        </button>
      </header>

      <div className="flex flex-col gap-6 p-6 md:px-10">
        <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
          {['Sua História', 'Rex', 'Luna', 'Coco', 'Bailey', 'Oliver', 'Max'].map((name, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0">
              <div className={`size-16 md:size-20 rounded-full p-1 border-2 ${i === 0 ? 'border-dashed border-gray-300' : 'border-primary shadow-lg shadow-primary/10'}`}>
                <div className={`w-full h-full rounded-full bg-cover bg-center ${i === 0 ? 'bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400' : ''}`}
                  style={i > 0 ? { backgroundImage: `url('https://i.pravatar.cc/150?u=${name}')` } : {}}>
                  {i === 0 && <span className="material-symbols-outlined text-3xl">add</span>}
                </div>
              </div>
              <span className="text-[10px] md:text-xs font-bold text-text-muted dark:text-gray-400">{name}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white dark:bg-card-dark rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/20 overflow-hidden ring-2 ring-gray-50 dark:ring-gray-800">
                    <img src={`https://i.pravatar.cc/100?u=${post.user}`} alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-bold dark:text-white">{post.user}</p>
                    <p className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">{post.pet}</p>
                  </div>
                </div>
                <button className="text-gray-400 p-1"><span className="material-symbols-outlined">more_horiz</span></button>
              </div>
              <img src={post.img} className="w-full aspect-[4/3] md:aspect-square object-cover" alt="" />
              <div className="p-4">
                <div className="flex items-center gap-5 mb-3">
                  <button className="flex items-center gap-1.5 text-red-500 hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined fill-current text-2xl">favorite</span>
                    <span className="text-xs font-black">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-2xl">chat_bubble</span>
                    <span className="text-xs font-black">12</span>
                  </button>
                  <button className="ml-auto text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-2xl">bookmark</span>
                  </button>
                </div>
                <p className="text-sm text-text-main dark:text-gray-300 leading-snug">
                  <span className="font-black mr-2 dark:text-white">{post.pet}</span>
                  {post.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
