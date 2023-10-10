'use client';

import { useEffect, useState } from 'react';

export function usePosts() {
  const [posts, setPosts] = useState<RecordModel[] | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await pb.collection('posts').getFullList();

      // const data = {
      //   body: `your new entry ${new Date().toISOString()}`,
      // };

      // pb.collection('posts').create(data);

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
