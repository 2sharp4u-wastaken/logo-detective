# בלש הסמלים · Logo Detective

משחק חינמי בעברית לילדים שאוהבים מכוניות: מזהים סמלים של 82 מותגי רכב, פותרים תיקים, ומגלים איך הסמלים השתנו לאורך השנים.

## מבנה

```
public/          האתר שמתפרסם (index.html בנוי, img/, eras.json, credits.html)
worker/index.js  ה-API של לוח הבלשים המשפחתי (Cloudflare Worker + D1)
src/             קוד המקור של הדף; python3 src/build.py בונה מחדש את public/index.html ו-public/credits.html
wrangler.jsonc   הגדרות Cloudflare
```

- **ציר הזמן של הסמלים** הוא קובץ סטטי, `public/eras.json`. כדי להוסיף סמל: מוסיפים תמונה ל-`public/img/` ושורה ל-`eras.json` (ואם היא מקומונס, גם ל-`src/commons_files.json`), מריצים `python3 src/build.py` ודוחפים.
- **לוח הבלשים המשפחתי**: משפחה מקבלת קוד אקראי בן 8 תווים. כל מכשיר שנכנס עם הקוד (או עם הקישור `/?family=CODE`) רואה את אותם שחקנים. נשמרים רק כינוי, צבע והתקדמות. עד 12 שחקנים למשפחה.

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
