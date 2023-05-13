import Centralizer from '@/components/layout/Centralizer';
import Hr from '@/components/layout/Hr';
import Links from '@/components/pages/board/Links';
import Form from '@/components/pages/board/form/Form';
import Replys from '@/components/post/reply/Replys';
import Thread from '@/components/post/thread/Thread';
import MediumTitle from '@/components/text/MediumTitle';
import { getAllReplysFor, getThreadById } from '@/lib/mongoHelper';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import { redirect } from 'next/navigation';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {};

export const dynamicParams = true;

const page = async ({ params }: { params: { threadId: string } }) => {
  metadata.description = 'Thread page including all replys';
  metadata.title = `Thread #${params.threadId}`;
  // try {
  const thread = await getThreadById(Number(params.threadId));
  const replys = getAllReplysFor(Number(params.threadId));

  if (thread && thread.op) {
    return (
      <>
        <Centralizer>
          <Image
            src='/dog.jpg'
            width={300}
            height={100}
            alt='a really cute cat picture'
            priority
          />
          <MediumTitle>HW - Hello World</MediumTitle>
          <Form op={false} threadNumber={thread.randomIdGeneratedByMe} />
        </Centralizer>
        <Hr />
        <Links destination='bottom' />
        <Hr />
        <Thread key={thread._id} thread={thread} from='inside'>
          {replys && <Replys replys={replys} />}
        </Thread>
        <Links destination='top' />
        <Footer />
      </>
    );
  }
  if (thread && !thread.op) {
    return redirect(
      '/res/' + thread.reply + '#' + thread.randomIdGeneratedByMe
    );
  }

  if (!thread) return <>Thread não encontrada.</>;
};

export default page;
