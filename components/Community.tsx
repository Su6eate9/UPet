
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
  ];

  return (
    <div className="flex flex-col h-full pb-32">
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark backdrop-blur-md p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <h1 className="text-2xl font-black tracking-tight dark:text-white">Community</h1>
        <button className="size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined">add_photo_alternate</span>
        </button>
      </header>

      <div className="flex flex-col gap-6 p-6">
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
          {['Your Story', 'Rex', 'Luna', 'Coco', 'Bailey', 'Oliver'].map((name, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 shrink-0">
              <div className={`size-16 rounded-full p-1 border-2 ${i === 0 ? 'border-dashed border-gray-300' : 'border-primary'}`}>
                <div className={`w-full h-full rounded-full bg-cover bg-center ${i === 0 ? 'bg-gray-100 flex items-center justify-center text-gray-400' : ''}`}
                  style={i > 0 ? { backgroundImage: `url('https://i.pravatar.cc/150?u=${name}')` } : {}}>
                  {i === 0 && <span className="material-symbols-outlined">add</span>}
                </div>
              </div>
              <span className="text-[10px] font-bold text-text-muted dark:text-gray-400">{name}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white dark:bg-card-dark rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-primary/20 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${post.user}`} alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-bold dark:text-white">{post.user}</p>
                    <p className="text-[10px] text-text-muted">{post.pet}</p>
                  </div>
                </div>
                <button className="text-gray-400"><span className="material-symbols-outlined">more_horiz</span></button>
              </div>
              <img src={post.img} className="w-full aspect-square object-cover" alt="" />
              <div className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <button className="flex items-center gap-1 text-red-500">
                    <span className="material-symbols-outlined fill-current">favorite</span>
                    <span className="text-xs font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-400">
                    <span className="material-symbols-outlined">chat_bubble</span>
                    <span className="text-xs font-bold">12</span>
                  </button>
                  <button className="ml-auto text-gray-400">
                    <span className="material-symbols-outlined">bookmark</span>
                  </button>
                </div>
                <p className="text-sm text-text-main dark:text-gray-300 leading-snug">
                  <span className="font-bold mr-2 dark:text-white">{post.pet}</span>
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
