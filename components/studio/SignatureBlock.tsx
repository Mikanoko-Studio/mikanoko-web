import { site } from "@/lib/site";

/**
 * The signature exactly as it must arrive in Gmail: a table, inline styles,
 * absolute image URL, system fonts.
 *
 * Do NOT restyle this with Tailwind classes. Gmail strips <style> blocks and
 * classes, so anything not written inline here is lost the moment it is
 * pasted. This markup is the deliverable, not a preview of it.
 *
 * The image is the @2x file constrained to 330x75 in the markup, so it stays
 * sharp on retina. The plain 330x75 file exists for Gmail's "Add an image ->
 * Web Address" box, which renders at the file's natural size and gives you no
 * way to resize it afterwards.
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
          <td style={{ padding: "0 0 12px 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${site.url}/studio/signature/mikanoko-signature@2x.png`}
              alt={site.name}
              width={330}
              height={75}
              style={{
                display: "block",
                border: 0,
                outline: "none",
                textDecoration: "none",
                width: "330px",
                height: "75px",
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ padding: "0 0 10px 0" }}>
            <table cellPadding={0} cellSpacing={0} border={0} style={{ borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      width: "52px",
                      height: "3px",
                      backgroundColor: "#F0722B",
                      lineHeight: "3px",
                      fontSize: 0,
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
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
