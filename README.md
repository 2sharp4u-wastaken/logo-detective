# מסע המותגים ובלש הסמלים · Logo Detective

שני משחקים חינמיים בעברית לילדים שאוהבים מכוניות, על 108 מותגי רכב:

- **מסע המותגים** (העמוד הראשי, `/`): מאיפה הגיע כל מותג, למי הוא שייך היום, המסע שלו בין מדינות ובעלים, משפחות של מותגים, חידון ומשחק זיכרון.
- **בלש הסמלים** (`/detective`): מזהים סמלים, פותרים תיקים, ומגלים איך הסמלים השתנו לאורך השנים. יש קישור אליו ממסע המותגים.

## מבנה

```
public/          האתר שמתפרסם (index.html ו-detective.html בנויים, img/, eras.json, credits.html)
worker/index.js  ה-API של לוח הבלשים המשפחתי (Cloudflare Worker + D1)
src/             קוד המקור; python3 src/build.py בונה מחדש את public/index.html, public/detective.html ו-public/credits.html
wrangler.jsonc   הגדרות Cloudflare
```

- **המותגים** (סיפורים, דגלים, משפחות) כתובים פעם אחת, ב-`src/journey.html`. זה אותו קובץ כמו המשחק ב-Claude, ובלש הסמלים לוקח ממנו את המידע בזמן הבנייה.
- **הסמלים**: `src/logo_map.json` (בלש הסמלים) ו-`src/journey_logo_map.json` (מסע המותגים; מותג שאין בו משתמש בסמל מבלש הסמלים). התמונות ב-`public/img/`.
- **ציר הזמן של הסמלים** הוא קובץ סטטי, `public/eras.json`. כדי להוסיף סמל: מוסיפים תמונה ל-`public/img/` ושורה ל-`eras.json` (ואם היא מקומונס, גם ל-`src/commons_files.json`), מריצים `python3 src/build.py` ודוחפים.
- **לוח הבלשים המשפחתי**: משפחה מקבלת קוד אקראי בן 8 תווים. כל מכשיר שנכנס עם הקוד (או עם הקישור `/detective?family=CODE`; קישורים ישנים בצורה `/?family=CODE` מועברים לשם) רואה את אותם שחקנים. נשמרים רק כינוי, צבע והתקדמות. עד 12 שחקנים למשפחה.

## פרסום (Cloudflare Workers, חינם)

1. dash.cloudflare.com → Workers & Pages → Create → Workers → **Connect to Git** → המאגר `logo-detective`.
2. Framework preset: **None**. Build command: ריק. Deploy command: `npx wrangler deploy`.
3. בפריסה הראשונה Wrangler יוצר לבד את מסד הנתונים `logo-detective-db`, והטבלאות נוצרות בבקשה הראשונה.

מכאן כל דחיפה ל-`main` מתפרסמת אוטומטית ל-`logo-detective.<account>.workers.dev`.

## פיתוח מקומי

```sh
npm install
python3 src/build.py
npx wrangler dev        # http://localhost:8787
```

## זכויות

הסמלים הם סימנים מסחריים של החברות שלהם. המשחק חינוכי, בלי קשר לחברות. מקורות ורישיונות של התמונות: `public/credits.html`. בקשות להסרה או לתיקון: Issues במאגר הזה.
