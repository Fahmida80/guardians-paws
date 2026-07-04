import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    // window.scrollTo(0, 0);
    document.querySelectorAll('.reveal').forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    });
  }, []);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/Banner_gpc.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(4px) brightness(0.6)",
            transform: "scale(1.05)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/40 to-navy-900/80 pointer-events-none z-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-semibold text-white tracking-wider">OUR STORY</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              A Movement Born{' '}
              <span className="bg-gradient-to-r from-sky-300 to-white bg-clip-text text-transparent">
                from Compassion
              </span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-sky-100/90 max-w-2xl mx-auto leading-relaxed">
              How a small group of animal lovers turned empathy into action across Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ORIGIN STORY ===== */}
      <section className="py-20 bg-white reveal">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-block mb-4 px-4 py-1.5 bg-navy-50 rounded-full">
            <span className="text-sm font-semibold text-navy-600">The Beginning</span>
          </div>
          <h2 className="text-4xl font-bold text-navy-700 mb-6">It Started with a Single Stray</h2>
          <p className="text-lg text-navy-600 leading-relaxed mb-6">
            In 2020, in the streets of Khulna, a group of friends noticed something that would change their lives forever — 
            a stray dog with a wounded leg, limping through the heat, ignored by everyone. They couldn't look away.
          </p>
          <p className="text-lg text-navy-600 leading-relaxed mb-6">
            That moment sparked an idea: what if they could be the voice for those who couldn't speak? 
            What if they could turn compassion into action?
          </p>
          <p className="text-lg text-navy-600 leading-relaxed">
            They started small — feeding a few strays, treating wounds, finding homes. But word spread. 
            More people wanted to help. More animals needed saving. And so, <strong className="text-navy-700">Guardians of Paws & Claws</strong> was born.
          </p>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="py-20 bg-navy-50/30 reveal">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-block mb-4 px-4 py-1.5 bg-sky-50 rounded-full">
            <span className="text-sm font-semibold text-sky-600">The Reality</span>
          </div>
          <h2 className="text-4xl font-bold text-navy-700 mb-6">Why Street Animals Need Us</h2>
          <p className="text-lg text-navy-600 leading-relaxed mb-6">
            Bangladesh is home to millions of stray dogs and cats. They face hunger, disease, accidents, and cruelty — 
            often alone, often forgotten. For many, survival is a daily battle.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-navy-100">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700">Hunger & Disease</h3>
              <p className="text-navy-500">Most strays struggle to find food and clean water. Without vaccination, diseases like rabies spread rapidly.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-navy-100">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700">Accidents & Cruelty</h3>
              <p className="text-navy-500">Injured strays often go untreated. Many face abuse and neglect, with no one to protect them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR APPROACH ===== */}
      <section className="py-20 bg-white reveal">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-block mb-4 px-4 py-1.5 bg-navy-50 rounded-full">
            <span className="text-sm font-semibold text-navy-600">Our Approach</span>
          </div>
          <h2 className="text-4xl font-bold text-navy-700 mb-6">How We Make a Difference</h2>
          <p className="text-lg text-navy-600 leading-relaxed mb-8">
            We don't just rescue. We rehabilitate, protect, and advocate — creating lasting change for animals and communities.
          </p>

          {/* Approach Cards */}
          <div className="space-y-6">
            <div className="flex gap-6 items-start p-6 bg-navy-50/30 rounded-xl border border-navy-100 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-navy-700 font-bold text-sm">01</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-700">Emergency Rescue</h3>
                <p className="text-navy-500">We respond to calls 24/7 — pulling injured animals from streets, drains, and dangerous situations.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start p-6 bg-sky-50/30 rounded-xl border border-sky-100 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sky-700 font-bold text-sm">02</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-700">Medical Care & Rehabilitation</h3>
                <p className="text-navy-500">Every rescued animal receives veterinary treatment, vaccinations, and a safe space to heal and recover.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start p-6 bg-emerald-50/30 rounded-xl border border-emerald-100 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-emerald-700 font-bold text-sm">03</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-700">Community Outreach</h3>
                <p className="text-navy-500">We educate communities on animal welfare, responsible pet ownership, and coexistence with strays.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start p-6 bg-purple-50/30 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-700 font-bold text-sm">04</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-700">Advocacy & Legal Action</h3>
                <p className="text-navy-500">We raise our voice against animal cruelty and pursue legal action to protect animals from abuse.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HUMAN ELEMENT ===== */}
      <section className="py-20 bg-navy-50/30 reveal">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-block mb-4 px-4 py-1.5 bg-sky-50 rounded-full">
            <span className="text-sm font-semibold text-sky-600">The People Behind It</span>
          </div>
          <h2 className="text-4xl font-bold text-navy-700 mb-6">Driven by Compassion</h2>
          <p className="text-lg text-navy-600 leading-relaxed mb-8">
            GPC is powered by a team of volunteers — students, professionals, retirees — united by a shared belief that every animal deserves dignity.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-navy-100 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-navy-100 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩‍⚕️</span>
              </div>
              <h3 className="text-xl font-bold text-navy-700">100+ Active Volunteers</h3>
              <p className="text-navy-500 text-sm">From all walks of life, giving their time and skills</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md border border-navy-100 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-sky-100 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🏡</span>
              </div>
              <h3 className="text-xl font-bold text-navy-700">7,000+ Animals Helped</h3>
              <p className="text-navy-500 text-sm">Each one a story of resilience and second chances</p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-navy-100 text-center">
            <p className="text-lg text-navy-600 italic">
              "We don't see ourselves as heroes. We see ourselves as people who couldn't walk away."
            </p>
            <p className="text-sm text-navy-400 mt-2">— A GPC Volunteer</p>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE STAND FOR ===== */}
      <section className="py-20 bg-white reveal">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-block mb-4 px-4 py-1.5 bg-navy-50 rounded-full">
            <span className="text-sm font-semibold text-navy-600">Our Values</span>
          </div>
          <h2 className="text-4xl font-bold text-navy-700 mb-6">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-navy-50/30 p-6 rounded-xl border border-navy-100">
              <h3 className="text-xl font-bold text-navy-700">Compassion</h3>
              <p className="text-navy-500">Every animal deserves care, regardless of their circumstances.</p>
            </div>
            <div className="bg-navy-50/30 p-6 rounded-xl border border-navy-100">
              <h3 className="text-xl font-bold text-navy-700">Integrity</h3>
              <p className="text-navy-500">We operate with transparency and accountability to our donors and community.</p>
            </div>
            <div className="bg-navy-50/30 p-6 rounded-xl border border-navy-100">
              <h3 className="text-xl font-bold text-navy-700">Action</h3>
              <p className="text-navy-500">We believe in doing, not just talking. Every rescue is a promise kept.</p>
            </div>
            <div className="bg-navy-50/30 p-6 rounded-xl border border-navy-100">
              <h3 className="text-xl font-bold text-navy-700">Community</h3>
              <p className="text-navy-500">We work together with local communities to create lasting change.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VISION & CTA ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-800 via-sky-800 to-navy-800 animate-gradient bg-[length:400%_400%]"></div>
        
        {/* White Diagonal Stripes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            #ffffff 40px,
            #ffffff 42px
          )`,
        }}></div>
        
        {/* Paw Print Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          backgroundRepeat: 'repeat',
        }}></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-semibold text-white tracking-wider">OUR VISION</span>
            </div>
            <h2 className="text-5xl font-bold text-white leading-tight drop-shadow-2xl">
              A Future Where{' '}
              <span className="bg-gradient-to-r from-sky-300 to-white bg-clip-text text-transparent">
                Kindness Prevails
              </span>
            </h2>
            <p className="mt-6 text-xl text-sky-100/90 max-w-2xl mx-auto leading-relaxed">
              We dream of a Bangladesh where no animal suffers alone — where empathy is the norm, and every stray finds safety, care, and love.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link to="/donate">
                <button className="px-8 py-4 bg-white text-navy-800 font-bold rounded-xl hover:bg-sky-50 transition-all duration-300 shadow-2xl hover:scale-105">
                  Support Our Mission
                </button>
              </Link>
              <Link to="/gallery">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300">
                  Meet Our Rescues
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;