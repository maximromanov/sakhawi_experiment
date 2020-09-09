import re

textPath = "/Users/romanovienna/_OpenITI/0925AH/data/0902Sakhawi/0902Sakhawi.DawLamic/0902Sakhawi.DawLamic.JK003608-ara1.mARkdownSimple"
uriBase  = "0902Sakhawi.DawLamic.JK003608-ara1"
reference = "<i>al-Ḍawʾ al-Lāmiʾ lī-Ahl al-Qarn al-Tāsiʿ</i>"


with open("template.html", "r") as f1:
    template = f1.read()
    #print(template)

bioPath = "../data/0902Sakhawi.DawLamic/"
stylePath = "../style.css"
lenName = 120

def processText(text):
    # clean
    text = re.sub("ms\d+|\$", "", text)
    # page numbers
    # regular paragraph
    # poetry
    # headers
    text = '<p class="arabic prose">%s</p>' % text
    return(text)


def generateData(textPath):
    prosop = []

    with open(textPath, "r") as f1:
        data = f1.read()
        data = re.split(r"###\$(\d+)\$#", data)

        realData = data[1:] # odd - ids; even - text
        print(len(realData))

        for i in range(0, len(realData), 2):
            ID = realData[i]
            text = realData[i+1]
            if "$" in text:
                textFormatted = processText(text)

                final = template
                final = final.replace("#BIO#", ID)
                final = final.replace("STYLEPATH", stylePath)
                final = final.replace("FULLREFERENCE", reference)
                final = final.replace("PASSAGEURI", uriBase+"."+ID)
                final = final.replace("MAINHTMLTEXT", textFormatted)

                name = text.replace("$", "").replace("\n", " ").replace("  ", " ").strip()
                name = name.split(".")[0]
                name = re.sub("[A-Za-z0-9]+", "", name).replace("  ", " ")
                if len(name) > lenName:
                    name = name[:lenName] + "..."

                #input(name)

                prosop.append("%s\t%s" % (ID, name))

                with open(bioPath+ID+".html", "w") as f9:
                    f9.write(final)

        with open("../data/prosopData.tsv", "w") as f9:
            f9.write("ID\tNAME\n"+ "\n".join(prosop))

generateData(textPath)