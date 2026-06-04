Au niveau workspace nx:
======================

npm install --save-dev tailwindcss @tailwindcss/postcss postcss

.postcssrc.json
---------------
{
"plugins": {
  "@tailwindcss/postcss": {}
   }
}
---------------

Au niveau workspace apps/d2f-nx-shared:
==============================

src/styles.css
/* @import 'tailwindcss'; */
@import 'tailwindcss/theme';
@import 'tailwindcss/utilities';

