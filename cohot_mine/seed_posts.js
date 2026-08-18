import { createClient } from '@supabase/supabase-js';

const url = 'https://cvvmxhseczzmkyjlqvsg.supabase.co';
const key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2dm14aHNlY3p6bWt5amxxdnNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMzY2NDYsImV4cCI6MjEwMjYxMjY0Nn0.fjC21BxdPRmWjb7W6X9QiXHABlaJrvNEHtoDfheuPSo';

const supabase = createClient(url, key);

async function seed() {
  const authorId = '81380bc8-ca29-4d32-97b9-e3cc4bdbf617';

  // Insert Posts
  const { data: posts, error: postErr } = await supabase
    .from('posts')
    .insert([
      {
        author_id: authorId,
        category: 'Announcement',
        content:
          'TOC solutions are up on Cohort 📖\nhave a look whenever you want... panic studying before the exam is still an option 🤫',
        tags: ['TOC', 'Exams', 'Resources'],
        media_url:
          'https://drive.google.com/drive/folders/1vK-5yOIEpuYwEnlvyUx_n_JXfj...',
      },
      {
        author_id: authorId,
        category: 'Academic',
        content:
          'Friendly announcement for those still "searching for resources" 🧐\n\nThe DBMS full question bank answer key is now available on Cohort.\nSo before asking "Does anyone have answers?" in every group chat, maybe check Cohort first 😎\n\nHere you go: https://drive.google.com/file/d/1uiy3jr-alX54_ZaWD34d8j0gOyW8ktQ u/view?usp=sharing',
        tags: ['DBMS', 'QuestionBank', 'ComputerEngg'],
      },
    ])
    .select();

  console.log('Posts inserted:', posts?.length, postErr?.message || 'Success');

  if (posts && posts.length > 0) {
    // Insert a comment
    const { data: comments, error: commentErr } = await supabase
      .from('post_comments')
      .insert([
        {
          post_id: posts[0].id,
          author_id: authorId,
          content: 'Cohort goated ngl',
        },
      ])
      .select();

    console.log('Comments inserted:', comments?.length, commentErr?.message || 'Success');
  }
}

seed();
