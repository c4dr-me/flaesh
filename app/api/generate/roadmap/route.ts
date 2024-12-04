import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const systemPrompt = `You are a roadmap generator. You take in a specific topic and output a complete learning path for that topic, covering as many subtopics as possible in a binary tree structure. Each node in the tree should contain a step with a title, description, and timeline. The tree should have a minimum depth of 4 levels, with at least 4 branches and 9-12 steps. Each node can optionally have two children (left and right) to represent subtopics.

The JSON structure must follow this format:

{
  "value": {
    "step": "Step Title",
    "description": "Step Description",
    "timeline": "Suggested Timeline (e.g., Week 1)"
  },
  "left": {
    "value": {
      "step": "Substep Title",
      "description": "Substep Description",
      "timeline": "Suggested Timeline"
    },
    "left": null,
    "right": null
  },
  "right": {
    "value": {
      "step": "Substep Title",
      "description": "Substep Description",
      "timeline": "Suggested Timeline"
    },
    "left": null,
    "right": null
  }
}

Rules:
1. Each value contains the step details.
2. Subtopics are nested under left and right, following the binary tree structure.
3. Any child without further subtopics must have left and right as null.

Return the roadmap in this format as JSON, starting from the root node.
`;

export async function POST(req: Request) {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const data = await req.text();

    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Generate a full detailed roadmap for the topic: ${data}` }
      ],
      response_format: { type: 'json_object' },
    });

    let roadmap;
    try {
      roadmap = JSON.parse(completion.choices[0].message.content);
    } catch (parseError) {
      throw new Error('Failed to parse roadmap JSON');
    }
    return NextResponse.json(roadmap);
  } catch (error) {
    console.error("Error creating roadmap:", error);
    return NextResponse.json({ error: error.message || "Failed to generate roadmap" }, { status: 500 });
  }
}