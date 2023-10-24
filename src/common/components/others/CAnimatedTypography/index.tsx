import { Typography } from '@mui/material';
import { motion, Variants } from 'framer-motion';

import { ICAnimatedTypographyProps } from './types';

const textContainer: Variants = {
  initial: {
    textShadow: 'none',
  },
  animate: {
    transition: {
      staggerChildren: 0.025,
    },
  },
  hover: {
    textShadow: '0px 0px 3px rgb(209 198 253)',
    scale: 1.005,
  },
};
const text: Variants = {
  initial: {
    y: '-200%',
    color: '#FF0088',
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
  },
  animate: {
    y: 0,
    color: '#124874',
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
  },
};

export const CAnimatedTypography: React.FC<ICAnimatedTypographyProps> = ({
  content,
  ...props
}) => {
  return (
    <Typography {...props}>
      <motion.span
        style={{ display: 'flex', overflow: 'hidden', userSelect: 'none' }}
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={textContainer}
      >
        {content?.split('').map((e, i) => (
          <motion.span key={i} variants={text}>
            {e === ' ' ? '\u00A0' : e}
          </motion.span>
        ))}
      </motion.span>
    </Typography>
  );
};
