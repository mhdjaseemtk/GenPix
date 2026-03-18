const posts = [
  {
    title: "How to Build a Strong Prompt Library for Brand Work",
    excerpt: "A repeatable way to move from vague ideas to consistent visual outputs across campaigns.",
  },
  {
    title: "Using AI Concepts to Speed Up Creative Review Cycles",
    excerpt: "Reduce revision rounds by giving stakeholders stronger visual starting points earlier in the process.",
  },
  {
    title: "When to Use Stylized Renders vs Photoreal Outputs",
    excerpt: "A practical framework for choosing the right output style based on channel, audience, and speed.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.22em] text-[#a3e635]">Blog</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
          Notes, guides, and workflows for AI image teams.
        </h1>
        <div className="mt-14 space-y-5">
          {posts.map((post) => (
            <article
              key={post.title}
              className="rounded-[28px] border border-white/8 bg-white/[0.03] p-7"
            >
              <h2 className="text-2xl font-medium">{post.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/50">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
