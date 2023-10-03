'use client';

import PocketBase, { RecordModel } from 'pocketbase';
import { useEffect, useState } from 'react';

export function usePosts() {
  const [posts, setPosts] = useState<RecordModel[] | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const pb = new PocketBase('http://127.0.0.1:8090');
      const posts = await pb.collection('posts').getFullList();

      const data = {
        body: `your new entry ${new Date().toISOString()}`,
      };

      pb.collection('posts').create(data);

      setPosts(posts);
    }
    fetchPosts();
  }, []);

  return posts;
}

export function PostList() {
  const posts = usePosts();

  return (
    <div>
      postlist
      {posts?.map((record) => (
        <div key={record.id}>{record.body}</div>
      ))}
    </div>
  );
}
