import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Menu, X, Factory, Leaf, Award, Truck,
  ChevronLeft, ChevronRight, Play, Pause,
  ArrowRight, CheckCircle, Send, Loader2,
  MapPin, Navigation, Phone, Mail, Clock,
  Volume2, VolumeX
} from 'lucide-react'

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const LOGO_SRC = '/images/logo.png'

// ─── HEADER ───────────────────────────────────────────────────────────────────
const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#products', label: 'Products' },
  { href: '#dealer', label: 'Become a Dealer' },
  { href: '#contact', label: 'Contact' },
]

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b-4 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img
              src={LOGO_SRC}
              alt="Amrita Agro Industries"
              width={60}
              height={60}
              className="object-contain"
            />
            <div className="hidden sm:block">
              <p className="font-bold text-lg text-foreground leading-tight">Amrita Agro</p>
              <p className="text-sm text-muted-foreground">Industries</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-foreground border-3 border-transparent hover:border-foreground hover:bg-muted transition-all"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#inquiry"
              className="ml-2 px-6 py-3 bg-primary text-primary-foreground font-bold border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Order Now
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 border-3 border-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t-3 border-foreground">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm font-semibold text-foreground border-3 border-foreground bg-card hover:bg-muted transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#inquiry"
                className="px-4 py-3 bg-primary text-primary-foreground font-bold border-4 border-foreground text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Order Now
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen pt-20 bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 border-8 border-foreground rotate-12" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-primary rotate-45" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 border-8 border-secondary" />
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-secondary rotate-12" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-5 md:space-y-6">
            <div className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground font-bold text-sm border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Trusted Since Generations
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
              Pure Nutrition for{' '}
              <span className="text-primary">Livestock.</span>
              <br />
              Pure Oil for{' '}
              <span className="text-secondary">Every Home.</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
              Amrita Agro Industries – Trusted Agricultural Manufacturing from Fatehabad, Haryana.
              Delivering quality cattle feed and pure mustard oil across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#dealer"
                className="px-5 py-2.5 md:px-6 md:py-3 bg-primary text-primary-foreground font-bold text-sm md:text-base border-2 md:border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-center"
              >
                Become a Dealer
              </a>
              <a
                href="#inquiry"
                className="px-5 py-2.5 md:px-6 md:py-3 bg-card text-foreground font-bold text-sm md:text-base border-2 md:border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-center"
              >
                Buy Products Online
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 pt-4 md:pt-6">
              <div className="p-2 md:p-3 bg-card border-2 md:border-4 border-foreground">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">5+</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Years Experience</p>
              </div>
              <div className="p-2 md:p-3 bg-card border-2 md:border-4 border-foreground">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-secondary">500+</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Happy Dealers</p>
              </div>
              <div className="p-2 md:p-3 bg-card border-2 md:border-4 border-foreground">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">100%</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Pure Quality</p>
              </div>
            </div>
          </div>

          {/* Right Content – Logo Display */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-52 h-52 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-4 bg-secondary border-2 md:border-4 border-foreground rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" />
              <div className="absolute inset-0 bg-primary border-2 md:border-4 border-foreground -rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" />
              <div className="absolute inset-2 bg-card border-2 md:border-4 border-foreground flex items-center justify-center p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <img
                  src={LOGO_SRC}
                  alt="Amrita Agro Industries - Symbol of Purity"
                  width={280}
                  height={280}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-foreground" />
    </section>
  )
}

// ─── SLIDESHOW ─────────────────────────────────────────────────────────────────
const slides = [
  {
    type: 'video',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video1-W4EIb43r38e5UJSOzR25x2W9rU4pdC.mp4',
    alt: 'Product video 1',
  },
  {
    type: 'image',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slide1-IMoN4SqXqCSkvyl1kKtInB2C7lNW3b.jpeg',
    alt: 'Cattle feed raw material',
  },
  {
    type: 'image',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slide2-9GCoVg0QwoD0HZ3dI7TH3QcF55m0Qq.jpeg',
    alt: 'Cotton seeds in jute bag',
  },
  {
    type: 'image',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/factory-LYxf3KAsYvUoHwJHZAqWaIqzVTcMM0.jpeg',
    alt: 'Amrita Agro Industries Factory',
  },
  {
    type: 'video',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video2-jbC27fIZ3ziGEhMduKxLNca5CFjVfz.mp4',
    alt: 'Product video 2',
  },
]

function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (!isPlaying || isVideoPlaying) return
    const currentSlide = slides[currentIndex]
    if (currentSlide.type === 'video') return
    const timer = setInterval(goToNext, 4000)
    return () => clearInterval(timer)
  }, [currentIndex, isPlaying, isVideoPlaying, goToNext])

  return (
    <section className="py-12 md:py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Our Products &amp; Facility
          </h2>
          <p className="text-muted-foreground">See our quality products and manufacturing unit</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Slide Container */}
          <div className="relative aspect-video border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-background">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                {slide.type === 'image' ? (
                  <img
                    src={slide.src}
                    alt={slide.alt || 'Slide image'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    key={`video-${index}-${currentIndex === index}`}
                    src={slide.src}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={() => { setIsVideoPlaying(false); goToNext() }}
                    autoPlay={currentIndex === index}
                    muted
                  />
                )}
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-card border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-card border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
            </button>

            {/* Play/Pause – desktop */}
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="hidden md:flex absolute top-4 right-4 z-20 w-10 h-10 bg-card border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] items-center justify-center hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            {/* Slide Counter – desktop */}
            <div className="hidden md:block absolute bottom-4 left-4 z-20 px-3 py-1 bg-card border-4 border-foreground">
              <span className="font-bold text-sm text-foreground">
                {currentIndex + 1} / {slides.length}
              </span>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center justify-center gap-3 mt-4">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="w-8 h-8 bg-card border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 border-2 border-foreground transition-all ${index === currentIndex
                  ? slide.type === 'video' ? 'bg-primary scale-125' : 'bg-secondary scale-125'
                  : 'bg-card'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
            <div className="px-2 py-1 bg-card border-2 border-foreground">
              <span className="font-bold text-xs text-foreground">
                {currentIndex + 1}/{slides.length}
              </span>
            </div>
          </div>

          {/* Dots Navigation – desktop */}
          <div className="hidden md:flex justify-center gap-3 mt-6">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 border-4 border-foreground transition-all ${index === currentIndex
                  ? slide.type === 'video' ? 'bg-primary scale-125' : 'bg-secondary scale-125'
                  : 'bg-card hover:bg-muted'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnails – desktop */}
          <div className="hidden md:flex justify-center gap-3 mt-6 overflow-x-auto pb-2">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-20 h-14 flex-shrink-0 border-4 overflow-hidden transition-all ${index === currentIndex
                  ? 'border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  : 'border-foreground opacity-70 hover:opacity-100'
                  }`}
              >
                {slide.type === 'image' ? (
                  <img src={slide.src} alt={slide.alt || 'Thumbnail'} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-foreground flex items-center justify-center">
                    <Play size={16} className="text-card" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Factory,
    title: 'Modern Manufacturing',
    description: 'State-of-the-art facility in Fatehabad ensuring consistent quality in every batch.',
  },
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'We use only the finest natural ingredients sourced from local farmers.',
  },
  {
    icon: Award,
    title: 'Quality Certified',
    description: 'All products meet strict quality standards for purity and nutrition.',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    description: 'Efficient distribution network serving dealers across the country.',
  },
]

function About() {
  return (
    <section id="about" className="py-12 md:py-16 lg:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 md:mb-12">
          <div className="inline-block px-3 py-1.5 bg-primary text-primary-foreground font-bold text-sm border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
            About Us
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
            Rooted in Haryana, Trusted Across India
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Amrita Agro Industries, based in Shekhupur Daroli, Fatehabad, is a leading manufacturer of
            premium agricultural products. With decades of experience, we specialize in producing
            high-quality cattle feed, pure mustard oil, and nutritious feed mixtures.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-3 md:p-4 bg-background border-2 md:border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-primary-foreground border-2 md:border-4 border-foreground flex items-center justify-center mb-3 group-hover:bg-secondary transition-colors">
                <feature.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-foreground mb-1">{feature.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 p-4 md:p-6 bg-secondary/10 border-2 md:border-4 border-foreground">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">Our Mission</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                To provide pure, nutritious, and affordable agricultural products that support the health of
                livestock and families. We believe in sustainable practices and supporting local farmers.
              </p>
            </div>
            <div className="flex-shrink-0 text-4xl md:text-5xl lg:text-6xl font-bold text-secondary/30">
              शुद्धता
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PRODUCTS ──────────────────────────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: 'Cattle Feed',
    nameHindi: 'पशु आहार',
    description:
      'Premium quality cattle feed formulated for optimal nutrition and health of your livestock. Rich in proteins, vitamins, and minerals.',
    features: ['High Protein Content', 'Essential Vitamins', 'Better Milk Yield', 'Healthy Livestock'],
    color: 'bg-primary',
  },
  {
    id: 2,
    name: 'Mustard Oil',
    nameHindi: 'सरसों का तेल',
    description:
      '100% pure and natural mustard oil extracted using traditional cold-press methods. Perfect for cooking and medicinal uses.',
    features: ['Cold Pressed', '100% Pure', 'Rich Flavor', 'Traditional Process'],
    color: 'bg-secondary',
  },
  {
    id: 3,
    name: 'Churi / Feed Mixture',
    nameHindi: 'चूरी / चारा मिश्रण',
    description:
      'Nutritious feed mixture made from high-quality ingredients. Ideal supplement for cattle diet to ensure balanced nutrition.',
    features: ['Balanced Nutrition', 'Easy to Digest', 'Cost Effective', 'Quality Ingredients'],
    color: 'bg-primary',
  },
]

function Products() {
  return (
    <section id="products" className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground font-bold text-sm border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
            Our Products
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 text-balance">
            Quality Products for Agriculture &amp; Home
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            From nutritious cattle feed to pure mustard oil, we manufacture products that farmers and families trust.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card border-2 md:border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] md:hover:translate-x-[3px] md:hover:translate-y-[3px] transition-all overflow-hidden"
            >
              <div className={`${product.color} p-3 md:p-4 border-b-2 md:border-b-4 border-foreground`}>
                <p className="text-xs font-medium text-primary-foreground/80 mb-0.5">{product.nameHindi}</p>
                <h3 className="text-lg md:text-xl font-bold text-primary-foreground">{product.name}</h3>
              </div>
              <div className="p-3 md:p-4">
                <p className="text-xs md:text-sm text-muted-foreground mb-4 leading-relaxed">
                  {product.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 ${product.color}`} />
                      <span className="text-xs md:text-sm font-medium text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#inquiry"
                  className={`flex items-center justify-center gap-2 w-full py-2.5 md:py-3 ${product.color} text-primary-foreground font-bold text-sm border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all`}
                >
                  Inquire Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── DEALER ────────────────────────────────────────────────────────────────────
const benefits = [
  'Competitive wholesale pricing',
  'Consistent product quality',
  'Timely delivery across India',
  'Marketing and promotional support',
  'Dedicated dealer support team',
  'Flexible order quantities',
]

function Dealer() {
  return (
    <section id="dealer" className="py-12 md:py-16 lg:py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1.5 bg-card text-foreground font-bold text-sm border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
              Partnership Opportunity
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground mb-3 md:mb-4 text-balance">
              Become a Distributor
            </h2>
            <p className="text-sm md:text-base text-primary-foreground/90 mb-5 md:mb-6 leading-relaxed">
              Join our growing network of dealers and distributors across India. Partner with Amrita Agro
              Industries and benefit from our quality products.
            </p>
            <ul className="grid grid-cols-2 gap-2 md:gap-3 mb-5 md:mb-6">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="text-secondary flex-shrink-0 w-4 h-4 md:w-5 md:h-5 mt-0.5" />
                  <span className="text-xs md:text-sm text-primary-foreground font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
            <a
              href="#inquiry"
              className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-secondary text-secondary-foreground font-bold text-sm md:text-base border-2 md:border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Apply to Become a Dealer
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="bg-card border-2 md:border-4 border-foreground p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">50+</p>
              <p className="text-sm md:text-base text-muted-foreground font-medium">Cities Served</p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-secondary border-2 md:border-4 border-foreground p-3 md:p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-0.5">500+</p>
                <p className="text-xs md:text-sm text-secondary-foreground/90 font-medium">Active Dealers</p>
              </div>
              <div className="bg-card border-2 md:border-4 border-foreground p-3 md:p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-0.5">95%</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Retention Rate</p>
              </div>
            </div>
            <div className="bg-card border-2 md:border-4 border-foreground p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <blockquote className="text-sm md:text-base text-muted-foreground italic mb-2">
                &ldquo;Partnering with Amrita Agro has been excellent for our business. Quality products and reliable delivery.&rdquo;
              </blockquote>
              <p className="text-sm font-bold text-foreground">– Rajesh Kumar, Dealer, Hisar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── INQUIRY FORM ─────────────────────────────────────────────────────────────
const productOptions = ['Cattle Feed', 'Mustard Oil', 'Churi / Feed Mixture', 'All Products']
const inquiryTypes = ['Retail Purchase', 'Bulk Order', 'Dealer Inquiry', 'Other']

// WhatsApp number with country code (no + or spaces)
const WHATSAPP_NUMBER = '919991689999'

function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', city: '', inquiryType: '', product: '', quantity: '', message: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const lines = [
      '🌾 *New Inquiry - Amrita Agro Industries*',
      '',
      '*Name:* ' + form.name,
      '*Phone:* ' + form.phone,
      '*City:* ' + form.city,
      '*Inquiry Type:* ' + form.inquiryType,
      '*Product:* ' + form.product,
      form.quantity ? '*Quantity:* ' + form.quantity : null,
      form.message ? '*Message:* ' + form.message : null,
    ].filter(Boolean).join('\n')

    const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines)
    window.open(url, '_blank', 'noopener,noreferrer')
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="inquiry" className="py-20 lg:py-32 bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary/10 border-4 border-foreground p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-20 h-20 bg-secondary text-secondary-foreground border-4 border-foreground flex items-center justify-center mx-auto mb-6">
              <Send size={40} />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Thank You!</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Your inquiry has been submitted successfully. Our team will contact you within 24 hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', city: '', inquiryType: '', product: '', quantity: '', message: '' }) }}
              className="px-6 py-3 bg-primary text-primary-foreground font-bold border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="inquiry" className="py-12 md:py-16 lg:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left Content */}
          <div>
            <div className="inline-block px-3 py-1.5 bg-primary text-primary-foreground font-bold text-sm border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
              Place Your Order
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 text-balance">
              Order Now or Inquire
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-5 leading-relaxed">
              Whether you&apos;re looking for retail purchases, bulk orders, or interested in becoming a dealer,
              fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-background border-2 md:border-4 border-foreground">
                <p className="font-bold text-sm text-foreground mb-0.5">For Immediate Assistance</p>
                <p className="text-sm text-muted-foreground">
                  Call us at{' '}
                  <a href="tel:9991689999" className="text-primary font-bold hover:underline">
                    +91 9991689999
                  </a>
                </p>
              </div>
              <div className="p-3 bg-background border-2 md:border-4 border-foreground">
                <p className="font-bold text-sm text-foreground mb-0.5">Email Us</p>
                <p className="text-sm text-muted-foreground">
                  <a href="mailto:info@amritaagro.com" className="text-primary font-bold hover:underline">
                    info@amritaagro.com
                  </a>
                </p>
              </div>
            </div>

            {/* Mini Map */}
            <div className="mt-5 border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="bg-card p-2 border-b-2 md:border-b-4 border-foreground flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-bold text-xs text-foreground">Our Location</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/Shekhupur+Daroli+Fatehabad+Haryana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground text-xs font-bold border border-foreground hover:bg-primary/90 transition-colors"
                >
                  <Navigation className="w-3 h-3" />
                  Directions
                </a>
              </div>
              <div className="relative h-[140px] md:h-[160px] bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55478.32379399908!2d75.41087595!3d29.5140975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39114cce6edcfdb5%3A0x8d5c3f3b6f09c731!2sFatehabad%2C%20Haryana!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Amrita Agro Industries Location"
                  className="absolute inset-0"
                />
              </div>
              <div className="bg-card p-1.5 border-t-2 md:border-t-4 border-foreground">
                <p className="text-xs text-muted-foreground text-center">Shekhupur Daroli, Fatehabad, Haryana</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-background border-2 md:border-4 border-foreground p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="space-y-3">
              {/* Row 1: Name + Phone side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-foreground mb-1">Full Name *</label>
                  <input type="text" id="name" name="name" required value={form.name} onChange={handleChange}
                    className="w-full px-3 py-2 bg-card border-4 border-foreground text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
                    placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-foreground mb-1">Phone *</label>
                  <input type="tel" id="phone" name="phone" required value={form.phone} onChange={handleChange}
                    className="w-full px-3 py-2 bg-card border-4 border-foreground text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
                    placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              {/* Row 2: City + Quantity side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="city" className="block text-sm font-bold text-foreground mb-1">City *</label>
                  <input type="text" id="city" name="city" required value={form.city} onChange={handleChange}
                    className="w-full px-3 py-2 bg-card border-4 border-foreground text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
                    placeholder="Your city" />
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-bold text-foreground mb-1">Quantity</label>
                  <input type="text" id="quantity" name="quantity" value={form.quantity} onChange={handleChange}
                    className="w-full px-3 py-2 bg-card border-4 border-foreground text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
                    placeholder="e.g., 100 kg" />
                </div>
              </div>

              {/* Row 3: Inquiry Type + Product side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-bold text-foreground mb-1">Inquiry Type *</label>
                  <select id="inquiryType" name="inquiryType" required value={form.inquiryType} onChange={handleChange}
                    className="w-full px-3 py-2 bg-card border-4 border-foreground text-foreground font-medium focus:border-primary focus:outline-none transition-colors">
                    <option value="">Select type</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="product" className="block text-sm font-bold text-foreground mb-1">Product *</label>
                  <select id="product" name="product" required value={form.product} onChange={handleChange}
                    className="w-full px-3 py-2 bg-card border-4 border-foreground text-foreground font-medium focus:border-primary focus:outline-none transition-colors">
                    <option value="">Select product</option>
                    {productOptions.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message full width */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-foreground mb-1">Message (Optional)</label>
                <textarea id="message" name="message" rows={3} value={form.message} onChange={handleChange}
                  className="w-full px-3 py-2 bg-card border-4 border-foreground text-foreground font-medium focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Any specific requirements or questions?" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold text-lg border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={24} />
                    Submit Inquiry
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ───────────────────────────────────────────────────────────────────
const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 9991689999',
    href: 'tel:9991689999',
    description: 'Call us for immediate assistance',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@amritaagro.com',
    href: 'mailto:info@amritaagro.com',
    description: 'Send us your queries',
  },
  {
    icon: MapPin,
    title: 'Factory Address',
    value: 'Shekhupur Daroli, Fatehabad, Haryana, India',
    href: 'https://www.google.com/maps/search/Shekhupur+Daroli+Fatehabad+Haryana',
    description: 'Visit our manufacturing facility',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    value: 'Mon - Sat: 9:00 AM - 6:00 PM',
    href: null,
    description: "We're available to help",
  },
]

function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-card text-foreground font-bold border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
            Contact Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6 text-balance">
            Get in Touch
          </h2>
          <p className="text-lg text-secondary-foreground/90">
            Have questions about our products or interested in partnership opportunities? We&apos;d love to
            hear from you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="bg-card border-4 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
              <div className="w-14 h-14 bg-primary text-primary-foreground border-4 border-foreground flex items-center justify-center mb-4">
                <item.icon size={28} />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-primary font-medium hover:underline break-words"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-foreground font-medium">{item.value}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
const quickLinks = [
  { href: '#about', label: 'About Us' },
  { href: '#products', label: 'Products' },
  { href: '#dealer', label: 'Become a Dealer' },
  { href: '#inquiry', label: 'Order Online' },
  { href: '#contact', label: 'Contact' },
]

const footerProducts = ['Cattle Feed', 'Mustard Oil', 'Churi / Feed Mixture']

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-card p-2 border-2 border-background">
                <img
                  src={LOGO_SRC}
                  alt="Amrita Agro Industries"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-lg text-background">Amrita Agro</p>
                <p className="text-sm text-background/70">Industries</p>
              </div>
            </div>
            <p className="text-background/80 mb-4 leading-relaxed">
              Trusted agricultural manufacturing from Fatehabad, Haryana. Quality cattle feed and pure mustard
              oil Since 2021.
            </p>
            <p className="text-sm text-background/60">
              शुद्धता का प्रतीक<br />
              Symbol of Purity
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg text-background mb-6 pb-2 border-b-2 border-background/20">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-background/80 hover:text-background hover:underline transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg text-background mb-6 pb-2 border-b-2 border-background/20">
              Our Products
            </h3>
            <ul className="space-y-3">
              {footerProducts.map((product) => (
                <li key={product}>
                  <a
                    href="#products"
                    className="text-background/80 hover:text-background hover:underline transition-colors"
                  >
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg text-background mb-6 pb-2 border-b-2 border-background/20">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <p className="text-background/60 text-sm">Phone</p>
                <a href="tel:9991689999" className="text-background hover:underline font-medium">
                  +91 9991689999
                </a>
              </li>
              <li>
                <p className="text-background/60 text-sm">Email</p>
                <a href="mailto:info@amritaagro.com" className="text-background hover:underline font-medium">
                  info@amritaagro.com
                </a>
              </li>
              <li>
                <p className="text-background/60 text-sm">Address</p>
                <p className="text-background/80">
                  Shekhupur Daroli,<br />
                  Fatehabad, Haryana, India
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t-4 border-background/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm text-center sm:text-left">
              © {currentYear} Amrita Agro Industries. All Rights Reserved.
            </p>
            <p className="text-background/60 text-sm">Fatehabad, Haryana, India</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <main>
      <Header />
      <Hero />
      <Slideshow />
      <About />
      <Products />
      <Dealer />
      <InquiryForm />
      <Contact />
      <Footer />
    </main>
  )
}
