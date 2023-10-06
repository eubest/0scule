import clsx from "clsx";
import Image from "next/legacy/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

import { getLinkPath } from "@/lib/menus";
import { usePaths } from "@/lib/paths";
import { useFooterMenuQuery } from "@/saleor/api";

import { Box } from "../Box";
import { ChannelDropdown } from "../regionDropdowns/ChannelDropdown";
import { LocaleDropdown } from "../regionDropdowns/LocaleDropdown";
import { useRegions } from "../RegionsProvider";
import styles from "./Footer.module.css";

export type FooterProps = HTMLAttributes<HTMLElement>;

// Saleor Cloud currently doesn't support relative URLs in the footer.
// This is a workaround to make the links work.
// @todo remove this when the issue is fixed.
const fixMenuItemLocalhostUrl = (url: string) => url.replace(/^https?:\/\/localhost:8000\//, "/");

export function Footer({ className, ...rest }: FooterProps) {
  const paths = usePaths();
  const { query, currentChannel, currentLocale } = useRegions();

  const { data, error } = useFooterMenuQuery({ variables: { ...query } });

  if (error) {
    console.error("Footer component error", error.message);
  }

  const menu = data?.menu?.items || [];

  return (
    <footer className={clsx(styles.footer, className)} {...rest}>
      <Box className={styles["footer-inner"]}>
        <div className="flex mb-14 sm:mb-10">
          <Link href={paths.$url()} passHref legacyBehavior>
            <a href="pass" className="hidden sm:inline-block">
              <div className="relative w-[50rem] h-[30.5rem] relative grayscale">
                <Image src="/sculenocolor.svg" alt="Saleor logo" layout="fill" />
              </div>
            </a>
          </Link>
          <div className="grid grid-cols-2 gap-[2rem] w-full sm:w-auto sm:flex sm:flex-wrap sm:justify-end sm:ml-auto">
            {menu.map((item) => (
              <div className="sm:ml-14" key={item?.id}>
                {item?.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles["menu-heading"]}
                  >
                    {item?.name}
                  </a>
                ) : (
                  <Link
                    href={getLinkPath(item, currentChannel.slug, currentLocale)}
                    passHref
                    legacyBehavior
                  >
                    <a href="pass" className={styles["menu-heading"]}>
                      {item?.name}
                    </a>
                  </Link>
                )}
                <ul className={styles.menu}>
                  {item?.children?.map((sub) => (
                    <li key={sub?.id}>
                      {sub?.url ? (
                        <a
                          href={fixMenuItemLocalhostUrl(sub.url)}
                          target="_blank"
                          rel="noreferrer"
                          className={styles["menu-link"]}
                          data-testid={`footerExternalLinks${sub?.name}`}
                        >
                          {sub?.name}
                        </a>
                      ) : (
                        <Link
                          href={getLinkPath(sub, currentChannel.slug, currentLocale)}
                          passHref
                          legacyBehavior
                        >
                          <a
                            href="pass"
                            className={styles["menu-link"]}
                            data-testid={`footerInternalLinks${sub?.name}`}
                          >
                            {sub?.name}
                          </a>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-main-3 flex-grow">
            © Copyright 2023 - {new Date().getFullYear()} Scule BJC
          </p>
          <div className="invisible md:visible flex gap-4">
          <ChannelDropdown horizontalAlignment="right" />
            <LocaleDropdown horizontalAlignment="right" />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <a href="https://anpc.ro/ce-este-sal" target="_blank" rel="noreferrer">
            <img
              src="https://bjctools.ro/wp-content/uploads/2023/06/sal.svg"
              width="250"
              height="50"
              alt="Image1"
            />
          </a>
          <a
            href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://bjctools.ro/wp-content/uploads/2023/06/soal.svg"
              width="250"
              height="50"
              alt="Image2"
            />
          </a>
        </div>
      </Box>
    </footer>
  );
}

export default Footer;