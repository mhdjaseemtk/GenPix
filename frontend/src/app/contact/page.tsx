export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <p className="text-sm uppercase tracking-[0.22em] text-[#a3e635]">Contact</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Let&apos;s build your next visual system faster.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">
            Reach out for demos, custom workflows, or help picking the right
            GenPix setup for your team.
          </p>
        </section>

        <section className="rounded-[30px] border border-white/8 bg-white/[0.03] p-7">
          <div className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/45">Email</p>
              <p className="mt-2 text-lg text-white">hello@genpix.ai</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/45">Sales</p>
              <p className="mt-2 text-lg text-white">sales@genpix.ai</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/45">Support Window</p>
              <p className="mt-2 text-lg text-white">Monday to Friday, 9 AM to 6 PM</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
