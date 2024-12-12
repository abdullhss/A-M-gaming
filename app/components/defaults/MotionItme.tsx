"use client";

import React, { ReactElement } from 'react';
import { motion } from "framer-motion";

const MotionItem = ({ children, className="" , initial  , animate , whileInView}: { children: React.ReactNode , animate? : any , className?: string , initial?:any  , whileInView?:any }) => {
  return (
    <motion.div initial={initial} whileInView={whileInView} animate={animate} className={className}>
      {children}
    </motion.div>
  );
};

export default MotionItem;