import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import OpenAI from 'openai';

const withApiAuthRequiredExtended = withApiAuthRequired as any;

export const POST = withApiAuthRequiredExtended(async (request: NextRequest, response: NextResponse) => {
    const { db } = await connectToDatabase();
    try {
        //const test = await db.collection("test").find({}).toArray();
        const session = await getSession(request, response);
        const user = session?.user;
        if (!user) {
            return NextResponse.error();
        }

        const body = await request.json();

        const { description, keywords, tone, title } = body as PostPrompt;

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const _generateTitle = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a blog post writer.'
                },
                {
                    role: 'user',
                    content: `
                Write me a title for a blog post about ${description}. THe keywords for the post are as follows: ${keywords}.
                The tone of the post should be ${tone}. THe title should be SEO friendly and no longer than 15 words. Write only one title.
                 ${title.length > 0 ? `Take that title into consideration: ${title}.` : ""
                        }}. Do not wrap the title in quites,.`,
                }
            ],
            temperature: 0.2
        })

        const titleResponse = _generateTitle.choices[0]?.message?.content;

        const _generatePost = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a blog post writer.'
                },
                {
                    role: 'user',
                    content: `Write me a long and interesting blog post about ${description}. The title of the article is as follows: ${titleResponse}.
                    These are the keywords for the post: ${keywords}. The blog post should be long and SEO friendly. The tone of the post
                    should be ${tone}. Write it as well as you can. Do not include the title in the post, just write the post. Divide the post into paragraphs
                    and write at least 3 paragraphs. Distinguish the paragraphs with a line break.`
                }
            ]
        })

        const postResponse = _generatePost.choices[0]?.message?.content;

        const _paragraphs = postResponse?.split('\n');

        const post : Post = {
            title: titleResponse || 'No title generated',
            content: _paragraphs || ['No content generated'],
            uid: user.sub
        }

        await db.collection('posts').insertOne(post);

        return NextResponse.json({ success: true, post: post }, { status: 200 });
    } catch (error) {
        return NextResponse.error();
    }
})
