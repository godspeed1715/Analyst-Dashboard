option explicit


Sub saveCM(NumActions, Content)
	Const ForReading = 1
	Const ForWriting = 2
	Dim objFSO
	Dim objFile
	Dim strText
	Dim strReplaced
	Dim strNewText
	Dim strNewContent
	Dim ReID

	Set objFSO = CreateObject("Scripting.FileSystemObject")
	Set objFile = objFSO.OpenTextFile("./dashboard-custom/CM.js", ForWriting)
	strNewContent = "var numActions=[{""Total"":" & numActions & "}]" & vbCrLf & "var CMActions=" & Content


	objFile.Write strNewContent
	objFile.Close
	
	reloadTable()
End Sub

