'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function ProductGallery({ image, title }: { image: string; title: string }) {
  // Fake Store API only provides a single image per product; duplicate to simulate a gallery.
  const [active] = useState(image);

  return (
    <div>
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative aspect-square rounded-3xl border border-border bg-card overflow-hidden"
      >
        <Image src={active} alt={title} fill className="object-contain p-10" priority sizes="(max-width: 768px) 100vw, 500px" />
      </motion.div>
    </div>
  );
}
