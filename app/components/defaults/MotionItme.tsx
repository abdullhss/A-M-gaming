"use client";

import React, { ReactElement } from 'react';
import { motion } from "framer-motion";

const MotionItem = ({ children, className="" , initial  , whileInView}: { children: React.ReactNode, className?: string , initial:any  , whileInView:any }) => {
  return (
    <motion.div initial={initial} whileInView={whileInView} className={className}>
      {children}
    </motion.div>
  );
};

export default MotionItem;