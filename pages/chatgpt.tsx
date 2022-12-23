import { DashboardCard } from '@components/modules/dashboard-card/dashboard-card';
import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const Gpt: NextPage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [messageData, setMessageData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: data.message,
      temperature: 0.6,
      max_tokens: 4000,
    });
    setMessageData([
      ...messageData,
      {
        question: data.message,
        answer: completion.data.choices[0].text,
      },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [loading]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-2xl mx-3">
        <div
          ref={divRef}
          className="h-[450px] sm:h-[calc(100vh-600px)] w-full bg-gray-800 rounded-md p-5 overflow-y-auto"
        >
          <div className="text-gray-400 font-bold">{t('questionsAndAnswers')}</div>
          {messageData.map((item: any) => {
            return (
              <div className="w-full p-2 " key={item.question}>
                <div className="text-gray-400 font-bold">{t('question')}</div>
                <div>- {item.question}</div>
                <div className="text-gray-400 font-bold">{t('answer')}</div>
                <div>- {item.answer}</div>
              </div>
            );
          })}
        </div>
        <div>
          <input
            placeholder={t('askAnyQuestion')!}
            disabled={loading ? true : false}
            {...register('message', { required: true, maxLength: 80 })}
            type="text"
            className="text-[10px] sm:text-base w-full bg-gray-300 outline-none dark:text-black p-2"
          />
          <button
            disabled={loading ? true : false}
            className="w-full pt-2 pb-2 sm:px-2 text-center flex justify-center items-center bg-green-400"
          >
            {loading ? t('loading') : t('submit')}
          </button>
        </div>
      </div>
    </form>
  );
};
export default Gpt;
