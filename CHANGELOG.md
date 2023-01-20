# Changelog

## 3.0.0 (2023-01-20)

- Upgrades to `quave:alert-react-tailwind` 3.0.0 which upgrades `@heroicons/react` to 2. As all the icons locations were changed this is a breaking change.

If you are not using `@heroicons/react` 2 don't upgrade.

## 2.0.1 (2022-06-17)

- Check for the existence of `result` (the return of `useFind`) before accessing `result.fetch`.

## 2.0.0 (2022-06-07)

- Implements `useMethod` and uses `quave:alert-react-tailwind` 2.0 which depends on React Router v6.

## 1.0.0 (2022-01-17)

- Implements `useData`.
