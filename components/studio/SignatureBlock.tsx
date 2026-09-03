import { site } from "@/lib/site";

/**
 * The signature exactly as it must arrive in Gmail: a table, inline styles,
 * absolute image URL, system fonts.
 *
 * Do NOT restyle this with Tailwind classes. Gmail strips <style> blocks and
 * classes, so anything not written inline here is lost the moment it is
 * pasted. This markup is the deliverable, not a preview of it.
 *
 * The image is the @2x file constrained to 330x90 in the markup, so it stays
 * sharp on retina. The plain 330x90 file exists for Gmail's "Add an image ->
 * Web Address" box, which renders at the file's natural size and gives you no
 * way to resize it afterwards.
 *
 * The orange rule is part of the image, not a table row. It is decorative, so
 * baking it in costs nothing when a client blocks images, and it removes a row
 * Gmail could otherwise mangle.
 */
export function SignatureBlock() {
  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      border={0}
      style={{
        borderCollapse: "collapse",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <tbody>
        <tr>
          <td style={{ padding: "0 0 10px 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${site.url}/studio/signature/mikanoko-signature@2x.png`}
              alt={site.name}
              width={330}
              height={90}
              style={{
                display: "block",
                border: 0,
                outline: "none",
                textDecoration: "none",
                width: "330px",
                height: "90px",
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ fontSize: "14px", lineHeight: "22px", color: "#2B2420" }}>
            <a
              href={`mailto:${site.email}`}
              style={{ color: "#2B2420", textDecoration: "none" }}
            >
              {site.email}
            </a>
            <span style={{ color: "#C9BCA8" }}>&nbsp;·&nbsp;</span>
            <a href={site.url} style={{ color: "#F0722B", textDecoration: "none" }}>
              {site.url.replace("https://", "")}
            </a>
          </td>
        </tr>
        <tr>
          <td
            style={{
              padding: "6px 0 0 0",
              fontSize: "12px",
              lineHeight: "18px",
              color: "#7A6C61",
            }}
          >
            we make small software. some of it is useful.
          </td>
        </tr>
      </tbody>
    </table>
  );
}
